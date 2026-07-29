
export function generateChallenge(userProfile) {

  const {
    goal,
    time,
    interests
  } = userProfile;

  let minutes = 15;

  switch (time) {

    case "Menos de 10 minutos":
      minutes = 10;
      break;

    case "Entre 10 y 20 minutos":
      minutes = 15;
      break;

    case "Entre 20 y 40 minutos":
      minutes = 30;
      break;

    case "Más de 40 minutos":
      minutes = 45;
      break;

    default:
      minutes = 15;

  }

  const topic =
    interests.length > 0
      ? interests[0]
      : "Tecnología";

  return {

    title: `📖 Leer durante ${minutes} minutos`,

    description:
      `Elegí un artículo relacionado con ${topic} y dedicá unos minutos a leer con tranquilidad.`

  };

}