self.addEventListener("push", function (e) {
  data = e.data.json();
  var options = {
    body: data.notification.body,
    icon: "https://res.cloudinary.com/dqrn1uojt/image/upload/v1676191613/logo-icon_bcjox4.png",
    data,
  };
  e.waitUntil(
    (async () => {
      await self.registration.showNotification(
        data.notification.title,
        options
      );
      const clients = await self.clients.matchAll({
        includeUncontrolled: true,
      });
      if (clients && clients.length) {
        for (let c of clients) {
          c.postMessage(options);
        }
      }
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
