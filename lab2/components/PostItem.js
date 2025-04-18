import styled from "styled-components/native";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const PostBox = styled.View`
  background-color: ${({ theme }) => theme.cardBackground};
  padding: 16px 20px;
`;

const UserHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const UserDetails = styled.View`
  flex-direction: row;
  align-items: center;
`;

const AvatarImg = styled.Image`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  margin-right: 10px;
`;

const NameTimeBlock = styled.View``;

const UserNameText = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  font-weight: 500;
`;

const Badge = styled.View`
  background-color: #e74c3c;
  border-radius: 4px;
  margin-left: 8px;
  padding: 2px 5px;
`;

const BadgeLabel = styled.Text`
  color: white;
  font-size: 10px;
  font-weight: bold;
`;

const TimeText = styled.Text`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 12px;
  margin-top: 2px;
`;

const ContentImg = styled.Image`
  width: 100%;
  height: 190px;
  border-radius: 10px;
  margin-bottom: 14px;
`;

const PostHeading = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  margin-bottom: 6px;
`;

const PostText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 12px;
`;

const Divider = styled.View`
  height: 8px;
  background-color: ${({ theme }) => theme.strokeTint};
`;

const ActionBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.strokeTint};
  padding-top: 12px;
`;

const ActionRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ActionBtn = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  margin-right: 24px;
`;

const LikeIcon = styled(Feather)`
  color: #2ecc71;
  font-size: 18px;
  margin-right: 5px;
`;

const CommentIcon = styled(Feather)`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 18px;
  margin-right: 5px;
`;

const ShareIcon = styled(FontAwesome)`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 18px;
`;

const ActionText = styled.Text`
  color: ${({ theme }) => theme.textSecondary};
`;

export default function PostItem({ post }) {
  return (
    <View>
      <Divider />
      <PostBox>
        <UserHeader>
          <UserDetails>
            <AvatarImg source={post.avatar} />
            <NameTimeBlock>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <UserNameText>{post.username}</UserNameText>
                {post.isNews && (
                  <Badge>
                    <BadgeLabel>NEWS</BadgeLabel>
                  </Badge>
                )}
              </View>
              <TimeText>{post.timestamp}</TimeText>
            </NameTimeBlock>
          </UserDetails>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={20} color="#888" />
          </TouchableOpacity>
        </UserHeader>

        <ContentImg source={post.image} />
        <PostHeading>{post.title}</PostHeading>
        <PostText>{post.description}</PostText>

        <ActionBar>
          <ActionRow>
            <ActionBtn>
              <LikeIcon name="thumbs-up" />
              <ActionText>{post.likes}</ActionText>
            </ActionBtn>
            <ActionBtn>
              <CommentIcon name="message-square" />
              <ActionText>{post.comments}</ActionText>
            </ActionBtn>
          </ActionRow>
          <TouchableOpacity>
            <ShareIcon name="share" />
          </TouchableOpacity>
        </ActionBar>
      </PostBox>
    </View>
  );
}
