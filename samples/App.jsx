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
     this.setState({ alphabet: [...alphabet].reverse()})
    }, 5000);

    return (
      <div prop1="sdfsdf">
        <List alphabet={this.state.alphabet} />
      </div>
    );
  }
}

export default App;
