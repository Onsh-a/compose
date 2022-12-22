// export default class Router {
//   constructor(rootElement) {
//     this.rootElement = rootElement;
//     this.path = window.location.pathname;
//   }
//
//   _routes = [
//     {
//       path: '/',
//       data: 'initial data',
//     },
//     {
//       path: '/path',
//       data: 'some data',
//     },
//     {
//       path: '/other-path',
//       data: 'totaly different data here',
//     }
//   ]
//
//   init() {
//     const links = document.querySelectorAll('a');
//     links.forEach(link => {
//       link.addEventListener('click', (event) => {
//         event.preventDefault();
//         this.path = event.target.pathname;
//         history.pushState({}, 'newUrl', this.path);
//         const data = this._routes.find(route => route.path === this.path);
//         if (!data) {
//           this.rootElement.innerHTML = '<h3 class="not-found">404<h3>';
//           throw new Error ('Path not found 404');
//         }
//         this.rootElement.innerHTML = data.data;
//       })
//     })
//
//     window.addEventListener('popstate', (e) => {
//       e.preventDefault();
//       const data = this._routes.find(route => route.path === window.location.pathname);
//     })
//
//     window.addEventListener('DOMContentLoaded', () => {
//       const route = this._routes.find(route => route.path === window.location.pathname);
//       // this.rootElement.innerHTML = route.data;
//     })
//   }
// }
