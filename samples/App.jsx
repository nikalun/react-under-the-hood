import OwnReact from "../src";

import List from "./List";
import Component from "../src/Component";

const alphabet = [
  "А",
  "Б",
  "В",
  "Г",
  "Д",
  "Е",
  "Ё",
  "Ж",
  "З",
  "И",
  "К",
  "Л",
  "М",
  "Н",
  "О",
  "П",
  "Р",
  "С",
  "Т",
  "У",
  "Ф",
  "Х",
  "Ц",
  "Ч",
  "Ш",
  "Щ",
  "Ъ",
  "Ы",
  "Ь",
  "Э",
  "Ю",
  "Я"
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alphabet
    };
  }

  render() {
    setTimeout(() => {
      this.setState({ alphabet: ["А", "Б"] });
    }, 5000);

    // eslint-disable-next-line
    return <List alphabet={this.state.alphabet} />;
  }
}

export default App;
