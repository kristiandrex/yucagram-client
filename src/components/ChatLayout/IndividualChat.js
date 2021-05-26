import styled from "styled-components";
import Messages from "components/Messages/Messages";
import WriteBox from "components/ChatLayout/WriteBox";

const StyledIndividualChat = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100%;
  overflow: hidden;

  @media (min-width: 576px) {
    .profile .material-icons {
      display: none;
    }
  }
`;

export default function IndividualChat() {
  return (
    <StyledIndividualChat>
      <Messages />
      <WriteBox />
    </StyledIndividualChat>
  );
}
