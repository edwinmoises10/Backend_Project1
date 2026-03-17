//!Method io()
const socketClient = io();

socketClient.on("connect", () => {
  console.log(`Cliente con ID: ${socketClient.id}`);

  const textFromServer = document.getElementById("textFromServer");
  if (textFromServer) {
    textFromServer.innerText = `Establecida Sesion con Server Express`;
    textFromServer.style.color = "#8a2be2";
  }
});

socketClient.on("productList", (data) => {
  const table = document.getElementById("table");

  if (data.length === 0) {
    table.innerHTML =
      "<tr><td colspan='7' style='text-align: center'>No hay productos disponibles</td></tr>";
    return;
  }

  table.innerHTML = "";

  data.forEach((e) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
    
    <td>${e.id}</td
    <td>${e.title}</td>
    <td>${e.code}</td>
    <td>${e.price}</td>
    <td>${e.stock}</td>
    <td>${e.category}</td>
    <td>${e.description}</td>
    
    
    `;

    table.appendChild(tr);
  });
});

socketClient.on("disconnect", "Cliente desconectado");
