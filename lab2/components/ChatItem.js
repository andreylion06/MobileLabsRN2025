import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

const ItemWrapper = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 12px 18px;
`;

const AvatarArea = styled.View`
  position: relative;
  margin-right: 14px;
`;

const AvatarImg = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const StatusDot = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 14px;
  height: 14px;
  border-radius: 7px;
  background-color: ${({ online }) => (online ? "#28c76f" : "#3498db")};
  border: 2px solid #111111;
`;

const ChatContent = styled.View`
  flex: 1;
`;

const UserLabel = styled.Text`
  font-size: 16px;
  color: #ffffff;
  font-weight: 500;
`;

const MessageRow = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

const PreviewText = styled.Text`
  color: #aaaaaa;
  font-size: 14px;
`;

const TimeText = styled.Text`
  color: #888888;
  font-size: 13px;
  margin-left: 6px;
`;

const UnreadBadge = styled.View`
  background-color: #ff5c5c;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

const UnreadCount = styled.Text`
  color: #ffffff;
  font-size: 12px;
`;

const RightSide = styled.View`
  align-items: flex-end;
`;

const DotIndicator = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #ffffff;
  margin-top: 4px;
`;

export default function ChatItem({ chat, onPress }) {
  return (
    <ItemWrapper onPress={onPress}>
      <AvatarArea>
        <AvatarImg source={chat.avatar} />
        {(chat.isOnline || chat.isSeenRecently) && (
          <StatusDot online={chat.isOnline} />
        )}
      </AvatarArea>

      <ChatContent>
        <UserLabel>{chat.username}</UserLabel>
        <MessageRow>
          {chat.isLastMessageYours && <PreviewText>You: </PreviewText>}
          <PreviewText>{chat.lastMessage}</PreviewText>
          <TimeText>• {chat.date}</TimeText>
        </MessageRow>
      </ChatContent>

      <RightSide>
        {chat.unreadMessagesCount > 0 ? (
          <UnreadBadge>
            <UnreadCount>{chat.unreadMessagesCount}</UnreadCount>
          </UnreadBadge>
        ) : (
          chat.isLastMessageYours && <DotIndicator />
        )}
      </RightSide>
    </ItemWrapper>
  );
}
