import OwnReact from "../src";
import ListItem from "./ListItem";

const List = ({ alphabet }) => (
  <ul>
    {alphabet.map(item => (
      <ListItem>{item}</ListItem>
    ))}
  </ul>
);

export default List;
