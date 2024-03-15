import { Alert, Button, Label, Modal } from "flowbite-react";
import { Input } from "./Input";
import { Photo } from "./Photo";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { HiInformationCircle } from "react-icons/hi";
import * as usersService from "../services/users";
import { User } from "../types/models";
import toast, { Toaster } from "react-hot-toast";

interface ProfileProps {
  open: boolean;
  toggle: () => void;
}

const defaultPhotoSrc =
  "https://www.flowbite-react.com/images/people/profile-picture-3.jpg";

export function Profile(props: ProfileProps) {
  const session = useSelector((state: RootState) => state.auth.session) as User;
  const [firstName, setFirstName] = useState(session?.first_name);
  const [lastName, setLastName] = useState(session?.last_name);
  const [business, setBusiness] = useState(session?.business);
  const [position, setPosition] = useState(session?.position_name);
  const [url, setUrl] = useState(session?.url);
  const [phone, setPhone] = useState(session?.phone);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [businessError, setBusinessError] = useState("");
  const [positionError, setPositionError] = useState("");
  const [urlError, setUrlError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [photoLoaded, setPhotoLoaded] = useState(false);
  const [photoSrc, setPhotoSrc] = useState(session?.photo_url);

  console.log(session);

  const handlePhotoChange = (src: any) => {
    setPhotoLoaded(true);
    setPhotoSrc(src);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFirstNameError("");
    setLastNameError("");
    setBusinessError("");
    setPositionError("");
    setUrlError("");
    setPhoneError("");

    await usersService
      .updateMe({
        first_name: firstName,
        last_name: lastName,
        business,
        position_name: position,
        url,
        phone,
        photo: photoLoaded ? photoSrc : "",
      })
      .then(() => {
        toast.success("Profile updated");
        props.toggle();
      })
      .catch((err) => {
        if (!err.cause) {
          toast.error(err.message);
          return;
        }
        if (err.cause.message) {
          toast.error(err.cause.message);
          return;
        }

        const cause = err.cause;
        if (cause.first_name) setFirstNameError(err.cause.first_name);
        if (cause.last_name) setLastNameError(err.cause.last_name);
        if (cause.business) setBusinessError(err.cause.business);
        if (cause.position_name) setPositionError(err.cause.position_name);
        if (cause.url) setUrlError(err.cause.url);
        if (cause.phone) setPhoneError(err.cause.phone);
      });
  };
  return (
    <>
      <Toaster />
      <Modal show={props.open} onClose={props.toggle}>
        <form onSubmit={handleSubmit}>
          <Modal.Header>Profile</Modal.Header>
          <Modal.Body>
            <div className="flex flex-row gap-4 pb-4">
              <div>
                <Photo
                  onChange={handlePhotoChange}
                  src={photoSrc ?? defaultPhotoSrc}
                  alt="Profile"
                  className="w-[10.25rem] h-[10.25rem]"
                />
              </div>
              <div className="flex flex-col flex-1 gap-4">
                <div className="flex flex-col flex-1">
                  <div className="mb-2 block">
                    <Label value="Business" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Your business"
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                  />
                  {businessError && (
                    <Alert
                      color="failure"
                      className="mt-2"
                      icon={HiInformationCircle}
                    >
                      {businessError}
                    </Alert>
                  )}
                </div>

                <div className="flex flex-col flex-1">
                  <div className="mb-2 block">
                    <Label value="Position" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Your position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                  {positionError && (
                    <Alert
                      color="failure"
                      className="mt-2"
                      icon={HiInformationCircle}
                    >
                      {positionError}
                    </Alert>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-4">
                <div className="flex flex-col flex-1">
                  <div className="mb-2 block">
                    <Label value="First name" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {firstNameError && (
                    <Alert
                      color="failure"
                      className="mt-2"
                      icon={HiInformationCircle}
                    >
                      {firstNameError}
                    </Alert>
                  )}
                </div>
                <div className="flex flex-col flex-1">
                  <div className="mb-2 block">
                    <Label value="Last name" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {lastNameError && (
                    <Alert
                      color="failure"
                      className="mt-2"
                      icon={HiInformationCircle}
                    >
                      {lastNameError}
                    </Alert>
                  )}
                </div>
              </div>

              <div>
                <div className="mb-2 block">
                  <Label value="Url" />
                </div>
                <Input
                  type="text"
                  placeholder="Your url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                {urlError && (
                  <Alert
                    color="failure"
                    className="mt-2"
                    icon={HiInformationCircle}
                  >
                    {urlError}
                  </Alert>
                )}
              </div>

              <div>
                <div className="mb-2 block">
                  <Label value="Phone" />
                </div>
                <Input
                  type="tel"
                  placeholder="Your phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {phoneError && (
                  <Alert
                    color="failure"
                    className="mt-2"
                    icon={HiInformationCircle}
                  >
                    {phoneError}
                  </Alert>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              className="rounded-none enabled:hover:bg-blue-800 focus:ring-blue-300 focus:ring-2 bg-blue-500 w-[100px]"
            >
              Save
            </Button>
            <Button
              color="gray"
              className="rounded-none w-[100px]"
              onClick={props.toggle}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
