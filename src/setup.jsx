import services from "./services"

(() => {
    services.init()
    window.appServices = services
})();