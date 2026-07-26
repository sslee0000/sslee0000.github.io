/* 의존성 없는 SVG 차트: 단일 시리즈 line/bar + 크로스헤어 툴팁.
   figure.chart 안의 <script type="application/json">에서 설정을 읽는다.
   { type: 'line'|'bar', labels: [], values: [], extras: [[줄, ...], ...] } */
(function () {
  "use strict";

  const NS = "http://www.w3.org/2000/svg";

  function color(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function fmtKrw(v) {
    if (v === null || v === undefined) return "-";
    const sign = v < 0 ? "-" : "";
    let man = Math.round(Math.abs(v) / 10000);
    if (man === 0) return "0";
    const eok = Math.floor(man / 10000);
    man = man % 10000;
    if (eok && man) return sign + eok + "억 " + man.toLocaleString() + "만";
    if (eok) return sign + eok + "억";
    return sign + man.toLocaleString() + "만";
  }

  function niceStep(rough) {
    const pow = Math.pow(10, Math.floor(Math.log10(rough)));
    const base = rough / pow;
    const nice = base <= 1 ? 1 : base <= 2 ? 2 : base <= 5 ? 5 : 10;
    return nice * pow;
  }

  function el(tag, attrs) {
    const node = document.createElementNS(NS, tag);
    for (const k in attrs) node.setAttribute(k, attrs[k]);
    return node;
  }

  function render(fig) {
    const cfgEl = fig.querySelector("script[type='application/json']");
    const holder = fig.querySelector(".plot");
    if (!cfgEl || !holder) return;
    const cfg = JSON.parse(cfgEl.textContent);
    const n = cfg.values.length;
    holder.innerHTML = "";
    if (!n) return;

    const W = Math.max(holder.clientWidth, 320);
    const H = 260, padL = 70, padR = 12, padT = 12, padB = 28;
    const iw = W - padL - padR, ih = H - padT - padB;

    /* y 스케일: bar는 0 포함, line은 위아래 5% 여백 */
    let lo = Math.min(...cfg.values), hi = Math.max(...cfg.values);
    if (cfg.type === "bar") { lo = Math.min(lo, 0); hi = Math.max(hi, 0); }
    /* 범위가 너무 좁으면 (값이 하나뿐이거나 변동이 작으면) 눈금이 전부
       같은 라벨로 반올림되므로 최소 400만원 폭을 보장한다 */
    const minSpan = 4e6;
    if (hi - lo < minSpan) {
      const mid = (hi + lo) / 2;
      lo = mid - minSpan / 2;
      hi = mid + minSpan / 2;
    }
    const pad = (hi - lo) * 0.05;
    if (cfg.type === "line") { lo -= pad; hi += pad; }
    const step = niceStep((hi - lo) / 4);
    lo = Math.floor(lo / step) * step;
    hi = Math.ceil(hi / step) * step;
    const y = (v) => padT + ih * (1 - (v - lo) / (hi - lo));
    const band = iw / n;
    const x = (i) => padL + band * (i + 0.5);

    const svg = el("svg", { width: W, height: H, viewBox: `0 0 ${W} ${H}` });
    svg.style.display = "block";

    /* 그리드 + y 라벨 */
    for (let v = lo; v <= hi + step / 2; v += step) {
      svg.appendChild(el("line", {
        x1: padL, x2: W - padR, y1: y(v), y2: y(v),
        stroke: color("--grid"), "stroke-width": 1,
      }));
      const t = el("text", {
        x: padL - 8, y: y(v) + 4, "text-anchor": "end",
        fill: color("--muted"), "font-size": 11,
      });
      t.textContent = fmtKrw(v);
      svg.appendChild(t);
    }

    /* x 라벨 (겹치지 않게 간격 선택) */
    const stride = Math.max(1, Math.ceil(n / Math.floor(iw / 64)));
    for (let i = 0; i < n; i += stride) {
      const t = el("text", {
        x: x(i), y: H - 8, "text-anchor": "middle",
        fill: color("--muted"), "font-size": 11,
      });
      t.textContent = cfg.labels[i];
      svg.appendChild(t);
    }

    const main = color("--series-1"), neg = color("--neg");

    if (cfg.type === "bar") {
      /* 0 기준선 */
      svg.appendChild(el("line", {
        x1: padL, x2: W - padR, y1: y(0), y2: y(0),
        stroke: color("--baseline"), "stroke-width": 1,
      }));
      const bw = Math.min(24, Math.max(3, band - 2));
      for (let i = 0; i < n; i++) {
        const v = cfg.values[i];
        const x0 = x(i) - bw / 2, y0 = y(0), y1 = y(v);
        const h = Math.abs(y1 - y0);
        const r = Math.min(4, bw / 2, h);
        let d;
        if (v >= 0) {
          d = `M${x0},${y0} L${x0},${y1 + r} Q${x0},${y1} ${x0 + r},${y1}` +
              ` L${x0 + bw - r},${y1} Q${x0 + bw},${y1} ${x0 + bw},${y1 + r}` +
              ` L${x0 + bw},${y0} Z`;
        } else {
          d = `M${x0},${y0} L${x0},${y1 - r} Q${x0},${y1} ${x0 + r},${y1}` +
              ` L${x0 + bw - r},${y1} Q${x0 + bw},${y1} ${x0 + bw},${y1 - r}` +
              ` L${x0 + bw},${y0} Z`;
        }
        svg.appendChild(el("path", { d, fill: v >= 0 ? main : neg }));
      }
    } else {
      const line = cfg.values.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ");
      const bottom = padT + ih;
      svg.appendChild(el("path", {
        d: `${line} L${x(n - 1)},${bottom} L${x(0)},${bottom} Z`,
        fill: main, "fill-opacity": 0.08,
      }));
      svg.appendChild(el("path", {
        d: line, fill: "none", stroke: main,
        "stroke-width": 2, "stroke-linejoin": "round",
      }));
      /* 점이 하나면 선이 안 보이므로 마커를 찍는다 */
      if (n === 1) {
        svg.appendChild(el("circle", { cx: x(0), cy: y(cfg.values[0]), r: 4, fill: main }));
      }
    }

    /* 호버 레이어: 크로스헤어 + 마커 + 툴팁 */
    const cross = el("line", {
      y1: padT, y2: padT + ih, stroke: color("--baseline"),
      "stroke-width": 1, "stroke-dasharray": "3 3", visibility: "hidden",
    });
    svg.appendChild(cross);
    const marker = el("circle", {
      r: 4, fill: main, stroke: color("--surface"),
      "stroke-width": 2, visibility: "hidden",
    });
    if (cfg.type === "line") svg.appendChild(marker);

    let tip = fig.querySelector(".viz-tooltip");
    if (!tip) {
      tip = document.createElement("div");
      tip.className = "viz-tooltip";
      fig.appendChild(tip);
    }

    const overlay = el("rect", {
      x: padL, y: padT, width: iw, height: ih, fill: "transparent",
    });
    overlay.addEventListener("mousemove", (ev) => {
      const rect = svg.getBoundingClientRect();
      const i = Math.max(0, Math.min(n - 1,
        Math.floor((ev.clientX - rect.left - padL) / band)));
      const px = x(i);
      cross.setAttribute("x1", px);
      cross.setAttribute("x2", px);
      cross.setAttribute("visibility", "visible");
      if (cfg.type === "line") {
        marker.setAttribute("cx", px);
        marker.setAttribute("cy", y(cfg.values[i]));
        marker.setAttribute("visibility", "visible");
      }
      const extras = (cfg.extras && cfg.extras[i]) || [];
      tip.innerHTML =
        `<div class="t-label"></div><div class="t-value"></div>` +
        extras.map(() => `<div class="t-extra"></div>`).join("");
      tip.children[0].textContent = cfg.labels[i];
      tip.children[1].textContent = fmtKrw(cfg.values[i]);
      extras.forEach((s, j) => { tip.children[2 + j].textContent = s; });
      tip.style.display = "block";
      const figRect = fig.getBoundingClientRect();
      let left = rect.left - figRect.left + px + 14;
      if (left + tip.offsetWidth > fig.clientWidth - 8) {
        left = rect.left - figRect.left + px - tip.offsetWidth - 14;
      }
      tip.style.left = left + "px";
      tip.style.top = (rect.top - figRect.top + padT) + "px";
    });
    overlay.addEventListener("mouseleave", () => {
      cross.setAttribute("visibility", "hidden");
      marker.setAttribute("visibility", "hidden");
      tip.style.display = "none";
    });
    svg.appendChild(overlay);
    holder.appendChild(svg);
  }

  function renderAll() {
    document.querySelectorAll("figure.chart").forEach(render);
  }

  let raf = null;
  window.addEventListener("resize", () => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(renderAll);
  });
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", renderAll);
  }
  document.addEventListener("DOMContentLoaded", renderAll);
})();
