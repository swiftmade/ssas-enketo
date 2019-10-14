import queryParams from "../../common/QueryParams";

$(document).ready(() => {
  if (!queryParams.has("css")) {
    return;
  }
  const css = queryParams.get("css");
  css.indexOf(".css") >= 0 ? injectLinkTag(css) : injectCss(css);
});

const injectLinkTag = path => {
  const link = document.createElement("link");
  link.id = "ssas_enketo_custom_css_link";
  link.rel = "stylesheet";
  link.href = path;
  document.head.appendChild(link);
};

const injectCss = css => {
  const style = document.createElement("style");
  style.id = "ssas_enketo_custom_css_stlye";
  style.innerHTML = css;
  document.head.appendChild(style);
};
