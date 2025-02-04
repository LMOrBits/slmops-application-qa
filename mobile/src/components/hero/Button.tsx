import { Link } from "@tanstack/react-router";
import "./button.css"
export default function IntroButton({text, link}: {text: string, link: string}) {
  
  return (
    <Link to={link}>
    <button className="buttoninro">
      <span className="span-mother">
        {text.split('').map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </span>
      <span className="span-mother2">
        {text.split('').map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </span>
    </button>
    </Link>
  );
}
