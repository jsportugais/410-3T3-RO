(function () {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const remoteRequested = params.has("remote") || params.has("remoteMultiplexId");

  function loadScript(source) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = source;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Impossible de charger ${source}`));
      document.head.appendChild(script);
    });
  }

  function showConnectionError(error) {
    console.error("La télécommande Reveal.js n'a pas pu démarrer.", error);

    const message = document.createElement("div");
    message.setAttribute("role", "alert");
    message.textContent = "Télécommande indisponible. Vérifiez que le serveur local est démarré.";
    Object.assign(message.style, {
      position: "fixed",
      top: "1rem",
      left: "50%",
      zIndex: "10000",
      maxWidth: "min(34rem, calc(100% - 2rem))",
      padding: "0.8rem 1rem",
      borderRadius: "0.5rem",
      background: "#8b1e2d",
      color: "#fff",
      font: "600 16px/1.4 system-ui, sans-serif",
      textAlign: "center",
      transform: "translateX(-50%)"
    });
    document.body.appendChild(message);
  }

  window.loadRevealRemote = async function () {
    if (!remoteRequested) {
      return [];
    }

    try {
      await loadScript("/socket.io/socket.io.min.js");
      await loadScript("/_remote/plugin/remote.js");

      if (!window.RevealRemote) {
        throw new Error("Le module RevealRemote est absent.");
      }

      return [window.RevealRemote];
    } catch (error) {
      showConnectionError(error);
      return [];
    }
  };
})();
