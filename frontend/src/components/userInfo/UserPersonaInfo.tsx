import "./UserPersonaInfo.css";
import { Form, Input } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { useSetRecoilState } from "recoil";
import { userInformationState } from "../../recoils/atom/userInformation";
import { PlacesAutoComplete } from "../googleMaps/PlacesAutoComplete";
import { UserForm } from "../../interfaces/interfaces";


function UserPersonaInfo({ form, setSelected, address }: UserForm) {
  const setFormValues = useSetRecoilState(userInformationState);
   

  const handleInputChange = async (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };


  return (
    <div className="user__container">
      <Form form={form} className="login-form">
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            prefix={<UserOutlined />}
            name="name"
            onChange={handleInputChange}
            placeholder="Name"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "The input is not a valid E-mail!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please input your phone!" }]}
          name="phone"
        >
          <Input
            prefix={<PhoneOutlined />}
            placeholder="Phone"
            name="phone"
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please input your address!" }]}
          name="address"
        >
          <PlacesAutoComplete address={address} setSelected={setSelected} handleInputChange={handleInputChange}/>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UserPersonaInfo;
