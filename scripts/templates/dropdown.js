import { capitalize } from "../utils/helper.js";

function formatFiltersList(list, cat) {
  let filtersList = "";
  list.map((item) => {
    filtersList += `<li class="selectable" data-cat=${cat}>${capitalize(
      item
    )}</li>`;
  });
  return filtersList;
}



export { formatFiltersList };
