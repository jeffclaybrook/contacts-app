export default function ThemeScript() {
 return (
  <script
   dangerouslySetInnerHTML={{
    __html: `
     (() => {
      try {
       const theme = localStorage.getItem("theme") || "light"
       document.documentElement.setAttribute("data-theme", theme)
      } catch (_) {}
     })()
    `
   }}
  />
 )
}