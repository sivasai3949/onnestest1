// components/Description.js
import parse from 'html-react-parser';

function Description({ htmlString }) {
  return <div className="description">{parse(htmlString)}</div>;
}

export default Description;
