import { Button, Label, Modal } from "flowbite-react";
import { Input } from "./Input";
import { TextArea } from "./TextArea";
import { Photo } from "./Photo";
import { useState } from "react";

interface ProfileProps {
  open: boolean;
  toggle: () => void;
}

export function Profile(props: ProfileProps) {
  const [photoSrc, setPhotoSrc] = useState(
    "https://www.flowbite-react.com/images/people/profile-picture-3.jpg"
  );
  const handlePhotoChange = (src: any) => {
    console.log(src);
    setPhotoSrc(src);
  };
  return (
    <Modal show={props.open} onClose={props.toggle}>
      <Modal.Header>Profile</Modal.Header>
      <Modal.Body>
        <form>
          <div className="flex flex-row gap-4 pb-4">
            <div>
              <Photo
                onChange={handlePhotoChange}
                src={photoSrc}
                alt="Profile"
                className="w-[10.25rem] h-[10.25rem]"
              />
            </div>
            <div className="flex flex-col flex-1 gap-4">
              <div className="flex flex-col flex-1">
                <div className="mb-2 block">
                  <Label value="Business" />
                </div>
                <Input type="text" placeholder="Your business" />
              </div>

              <div className="flex flex-col flex-1">
                <div className="mb-2 block">
                  <Label value="Position" />
                </div>
                <Input type="text" placeholder="Your position" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4">
              <div className="flex flex-col flex-1">
                <div className="mb-2 block">
                  <Label value="First name" />
                </div>
                <Input type="text" placeholder="Your first name" />
              </div>
              <div className="flex flex-col flex-1">
                <div className="mb-2 block">
                  <Label value="Last name" />
                </div>
                <Input type="text" placeholder="Your last name" />
              </div>
            </div>

            <div>
              <div className="mb-2 block">
                <Label value="Url" />
              </div>
              <Input type="text" placeholder="Your url" />
            </div>

            <div>
              <div className="mb-2 block">
                <Label value="Phone" />
              </div>
              <Input type="tel" placeholder="Your phone" />
            </div>

            <div>
              <div className="mb-2 block">
                <Label value="Description" />
              </div>
              <TextArea rows={4} placeholder="Your description" />
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="rounded-none enabled:hover:bg-blue-800 focus:ring-blue-300 focus:ring-2 bg-blue-500 w-[100px]"
          onClick={props.toggle}
        >
          Save
        </Button>
        <Button
          color="gray"
          className="rounded-none w-[100px]"
          onClick={props.toggle}
        >
          Decline
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
