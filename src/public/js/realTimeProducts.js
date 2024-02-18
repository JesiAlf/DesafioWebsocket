const socket = io();

socket.on("productos", (productos) => {
  console.log(productos)
  const producCont = document.getElementById("#productos-table");
  if (!producCont) {
    console.error("El producto con dicho id no funciona");
    return;
  }

  const headerHTML = `
  <tr>
    <th>id:</th>
    <th>title:</th>
    <th>description:</th>
    <th>code:</th>
    <th>price:</th>
    <th>stock:</th>
    <th>category:</th>
    <th>thumbnail:</th>

  </tr>
    `;
  producCont.innerHTML = headerHTML;

  productos.forEach((producto) => {
    producCont.innerHTML += `
        <tr>
        <td>${producto.id}</td>
        <td>${producto.title}</td>
        <td>${producto.description}</td>
        <td>${producto.price}</td>
        <td>${producto.code}</td>
        <td>${producto.stock}</td>
        <td>${producto.category}</td>
        <td>${producto.thumbnail}</td>
</tr>
`;
  });
});

document.getElementById("#new-Producto").addEventListener("submit",(event)=>{
   event.preventDefault();

   socket.emit("new-Product",{
    title:document.getElementById("title").value,
    description:document.getElementById("description").value,
    code:document.getElementById("code").value,
    price:document.getElementById("price").value,
    stock:document.getElementById("stock").value,
    category:document.getElementById("category").value,
    thumbnail:document.getElementById("thumbnail").value,
});

event.target.reset();
});

document.getElementById("#delete-Product").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const pDeleteId = document.getElementById("#id").value;
    
    console.log(pDeleteId);
    socket.emit("#delete-Product", pDeleteId);
    
    event.target.reset();
});


socket.on("response",(response)=>{
    if (response.status==="success") {
        document.getElementById("#responsive-Cont").innerHTML=`<p class="success">${response.message}</p>`;

    } else {
        document.getElementById("#responsive-Cont").innerHTML=`<p class="error">${response.message}</p>`
    }
})