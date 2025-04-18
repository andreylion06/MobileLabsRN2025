import styled from "styled-components/native";

const ItemWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 18px;
  height: 74px;
`;

const PreviewImage = styled.Image`
  width: 70px;
  height: 48px;
  border-radius: 6px;
  margin-right: 12px;
`;

const GameInfoCol = styled.View`
  flex: 1;
`;

const GameName = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
`;

const PlatformInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 2px;
`;

const PlatformLabel = styled.Text`
  font-size: 13px;
  color: #aaa;
`;

const PriceSection = styled.View`
  flex-direction: column;
  align-items: flex-end;
`;

const PriceLine = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const OldPrice = styled.Text`
  font-size: 13px;
  color: #888;
  text-decoration: line-through;
  margin-right: 6px;
`;

const CurrentPrice = styled.Text`
  font-size: 16px;
  color: #ffffff;
`;

const SaleTag = styled.View`
  background-color: #2ecc71;
  padding: 3px 6px;
  border-radius: 6px;
  margin-top: 4px;
  margin-left: 6px;
`;

const SaleText = styled.Text`
  color: #fff;
  font-size: 11px;
  font-weight: bold;
`;

const OSIcon = styled.Image`
  width: 13px;
  height: 13px;
  margin-right: 6px;
`;

export default function GameItem({ game }) {
  const hasDiscount = game.discount && game.price;

  return (
    <ItemWrapper>
      <PreviewImage source={game.image} />
      <GameInfoCol>
        <GameName>{game.title}</GameName>
        {game.icons?.length > 0 && (
          <PlatformInfo>
            {game.icons.map((icon, idx) => (
              <OSIcon key={idx} source={icon} />
            ))}
            <PlatformLabel>{game.platform}</PlatformLabel>
          </PlatformInfo>
        )}
      </GameInfoCol>

      <PriceSection>
        {hasDiscount ? (
          <>
            <PriceLine>
              <OldPrice>{game.price}</OldPrice>
              <CurrentPrice>{game.discountedPrice}</CurrentPrice>
            </PriceLine>
            <SaleTag>
              <SaleText>{game.discount}</SaleText>
            </SaleTag>
          </>
        ) : (
          <CurrentPrice>{game.price}</CurrentPrice>
        )}
      </PriceSection>
    </ItemWrapper>
  );
}
