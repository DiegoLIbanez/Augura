// Funcion para formatear la fecha

export const fecha = (dateMongo) => {
  const date = new Date(dateMongo);
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const año = date.getFullYear();
  const horas = String(date.getHours()).padStart(2, "0");
  const minutos = String(date.getMinutes()).padStart(2, "0");
  return `${dia}/${mes}/${año} ${horas}:${minutos}`;
};

export const fechaGraphics = (dateMongo) => {
  const date = new Date(dateMongo);
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const año = date.getFullYear();

  return `${dia}/${mes}/${año}`;
};
