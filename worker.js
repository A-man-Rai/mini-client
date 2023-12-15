console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log(data);
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: "Notified by Accident Mapping App",
    icon: "https://png.pngtree.com/png-vector/20190817/ourlarge/pngtree-safety-symbols-and-signs-first-png-image_1693991.jpg"
  });
});
