import { Invitation } from "./templates/template-name";
import { mockEvent, mockSubmitRegistration } from "./preview/mock-data";

export default function App() {
  return (
    <Invitation
      event={mockEvent}
      onSubmitRegistration={mockSubmitRegistration}
    />
  );
}
