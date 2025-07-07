import React, { useState } from 'react';

export interface Address {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

interface AddressFormProps {
  onAddressChange: (address: Address, isValid: boolean) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onAddressChange }) => {
  const [address, setAddress] = useState<Address>({
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
  });

  const [touched, setTouched] = useState<{ [K in keyof Address]?: boolean }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const validate = (addr: Address) => {
    return (
      addr.name.trim() !== '' &&
      /^\d{10}$/.test(addr.phone) &&
      addr.addressLine1.trim() !== '' &&
      addr.city.trim() !== '' &&
      addr.state.trim() !== '' &&
      /^\d{6}$/.test(addr.pincode) &&
      addr.country.trim() !== ''
    );
  };

  React.useEffect(() => {
    onAddressChange(address, validate(address));
    // eslint-disable-next-line
  }, [address]);

  return (
    <form className="space-y-4 p-4 border border-zinc-800 rounded-md shadow-sm bg-zinc-900 max-w-md mx-auto">
      <div>
        <label className="block font-medium text-zinc-100">Name*</label>
        <input
          type="text"
          name="name"
          value={address.name}
          onChange={handleChange}
          className="w-full border border-zinc-700 px-2 py-1 rounded bg-zinc-800 text-zinc-100 placeholder-zinc-400"
          required
          placeholder="Enter your name"
        />
      </div>
      <div>
        <label className="block font-medium text-zinc-100">Phone* (10 digits)</label>
        <input
          type="tel"
          name="phone"
          value={address.phone}
          onChange={handleChange}
          className="w-full border border-zinc-700 px-2 py-1 rounded bg-zinc-800 text-zinc-100 placeholder-zinc-400"
          required
          pattern="\d{10}"
          placeholder="Enter your phone number"
        />
      </div>
      <div>
        <label className="block font-medium text-zinc-100">Address Line 1*</label>
        <input
          type="text"
          name="addressLine1"
          value={address.addressLine1}
          onChange={handleChange}
          className="w-full border border-zinc-700 px-2 py-1 rounded bg-zinc-800 text-zinc-100 placeholder-zinc-400"
          required
          placeholder="Street, building, etc."
        />
      </div>
      <div>
        <label className="block font-medium text-zinc-100">Address Line 2</label>
        <input
          type="text"
          name="addressLine2"
          value={address.addressLine2}
          onChange={handleChange}
          className="w-full border border-zinc-700 px-2 py-1 rounded bg-zinc-800 text-zinc-100 placeholder-zinc-400"
          placeholder="Apartment, suite, etc. (optional)"
        />
      </div>
      <div>
        <label className="block font-medium text-zinc-100">City*</label>
        <input
          type="text"
          name="city"
          value={address.city}
          onChange={handleChange}
          className="w-full border border-zinc-700 px-2 py-1 rounded bg-zinc-800 text-zinc-100 placeholder-zinc-400"
          required
          placeholder="Enter your city"
        />
      </div>
      <div>
        <label className="block font-medium text-zinc-100">State*</label>
        <input
          type="text"
          name="state"
          value={address.state}
          onChange={handleChange}
          className="w-full border border-zinc-700 px-2 py-1 rounded bg-zinc-800 text-zinc-100 placeholder-zinc-400"
          required
          placeholder="Enter your state"
        />
      </div>
      <div>
        <label className="block font-medium text-zinc-100">Pincode* (6 digits)</label>
        <input
          type="text"
          name="pincode"
          value={address.pincode}
          onChange={handleChange}
          className="w-full border border-zinc-700 px-2 py-1 rounded bg-zinc-800 text-zinc-100 placeholder-zinc-400"
          required
          pattern="\d{6}"
          placeholder="Enter your pincode"
        />
      </div>
      <div>
        <label className="block font-medium text-zinc-100">Country*</label>
        <input
          type="text"
          name="country"
          value={address.country}
          onChange={handleChange}
          className="w-full border border-zinc-700 px-2 py-1 rounded bg-zinc-800 text-zinc-100 placeholder-zinc-400"
          required
          placeholder="Enter your country"
        />
      </div>
    </form>
  );
};

export default AddressForm; 