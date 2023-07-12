import { useNavigate } from "react-router-dom";
import {
  DirectoryItemContainer,
  BackgroundImage,
  Body,
  LinkWrapper,
} from "./directory-item.styles";

const DirectoryItem = ({ category: { title, imageUrl, id, route } }) => {
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);
  return (
    <DirectoryItemContainer key={id} onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <LinkWrapper>
          <span>Shop Now</span>
        </LinkWrapper>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
