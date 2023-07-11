import { Link } from "react-router-dom";
import {
  DirectoryItemContainer,
  BackgroundImage,
  Body,
  LinkWrapper,
} from "./directory-item.styles";

const DirectoryItem = ({ category: { title, imageUrl, id } }) => {
  return (
    <DirectoryItemContainer key={id}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <LinkWrapper>
          <Link to={`shop/${title}`}>Shop Now</Link>
        </LinkWrapper>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
