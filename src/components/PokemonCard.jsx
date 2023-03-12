import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { useDispatch } from "react-redux";
import { setFavorite } from "../slices/dataSlice";
import { StartButton } from "./StartButton";

export const PokemonCard = ({ name, image, types, id, favorite }) => {
  const dispatch = useDispatch();
  const typeString = types.map((elem) => elem.type.name).join(", ");

  const handleOnFavorite = () => {
    dispatch(setFavorite({ pokemonId: id }));
  };

  return (
    <Card
      title={name}
      cover={<img src={image} alt={image} />}
      extra={<StartButton isFavorite={favorite} onClick={handleOnFavorite} />}
    >
      <Meta description={typeString} />
    </Card>
  );
};
