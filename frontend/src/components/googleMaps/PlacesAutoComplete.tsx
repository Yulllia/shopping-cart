import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { AutoComplete } from "antd";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { userInformationState } from "../../recoils/atom/userInformation";
import { AutoCompleteI } from "../../interfaces/interfaces";

export const PlacesAutoComplete = ({
  setSelected,
  handleInputChange,
  address,
}: AutoCompleteI) => {
  const {
    ready,
    setValue,
    value,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  const setFormValues = useSetRecoilState(userInformationState);
  const [inputChange, setInputChange] = useState<boolean>(false);


  useEffect(() => {
    setValue("");
    setInputChange(false)
    setFormValues((prevValues) => ({ ...prevValues, address: address }));
  }, [address]);


  const handleSelect = async (address: string) => {
    setValue(address, false);
    setInputChange(true)
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  return (
    <AutoComplete
     value={inputChange ? value : address}
      onSelect={handleSelect}
      onChange={(value) => {
        setValue(value);
        setInputChange(true)
        handleInputChange({ target: { name: "address", value: value} });
      }}
      disabled={!ready}
      placeholder="Search an address"
    >
      {status === "OK" &&
        data.map(({ place_id, description }) => (
          <AutoComplete.Option key={place_id} value={description}>
            {description}
          </AutoComplete.Option>
        ))}
    </AutoComplete>
  );
};
