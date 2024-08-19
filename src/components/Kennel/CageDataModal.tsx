import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { Input } from '../../components/ui/input';
import { viewDetails, editCages } from '../../Api/Kennel';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { useState, useEffect } from 'react';
import { MdOutlineDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import PacmanLoader from "react-spinners/PacmanLoader";
import { CageData } from '../../Interface/DatatypeInterface';


interface Error {
  kennelname?: string;
  location?: string;
  description?: string;
  maxCount?: string;
  phone?: string;
  PricePerNight?: string;
  type?: string;
  images?: string;
}

const CageDataModal = ({ cageid, fetchCages }) => {

  const kennelOwnerData = useSelector((state: RootState) => state.kennel.kennelOwnerData);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [cagedata, setCageData] = useState<CageData>()
  const [initialCageData, setInitialCageData] = useState<CageData>()
  const [errors, setErrors] = useState<Error>({});


  const validateForm = () => {
    const newErrors: Error = {};

    if (!cagedata?.kennelname?.trim()) newErrors.kennelname = "Kennel name is required";
    if (!cagedata?.location?.trim()) newErrors.location = "Location is required";
    if (!cagedata?.description?.trim()) newErrors.description = "Description is required";
    else if (cagedata.description.length > 500) newErrors.description = "Description should not exceed 5 00 characters";
    if (!cagedata?.phone?.trim()) newErrors.phone = "Phone number is required";
    else if (cagedata.phone.length !== 10) newErrors.phone = "Phone number must contain 10 digits";
    if (!cagedata?.type) newErrors.type = "Type is required";
    if (!cagedata?.maxcount || cagedata.maxcount <= 0) newErrors.maxCount = "Max count must be greater than 0";
    if (!cagedata?.pricepernight || cagedata.pricepernight <= 0) newErrors.PricePerNight = "Price per night must be greater than 0";
    if (cagedata?.image?.length !== 3) newErrors.images = "Exactly 3 images are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const urlToFile = async (url: string): Promise<File> => {
    const response = await fetch(url);
    const blob = await response.blob();
    const fileName = url.split('/').pop() || 'editimages';
    return new File([blob], fileName, { type: blob.type });
  };



  const fetchData = async () => {
    try {
      const response = await viewDetails(cageid)
      setCageData(response?.data.message)
      setInitialCageData(response?.data.message)
    } catch (error) {
      console.error('Failed to fetch cage details:', error);
      toast.error('Failed to fetch cage details');
    }
  }



  useEffect(() => {
    fetchData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCageData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleEdit = async () => {
    if (!cagedata) {
      console.error("Cagedata is undefined.");
      return;
    }
    if (JSON.stringify(cagedata) == JSON.stringify(initialCageData)) {
      onOpenChange()
    }

    const isValid = validateForm();
    if (isValid && JSON.stringify(cagedata) !== JSON.stringify(initialCageData)) {

      try {
        setLoading(true);
        const formData = new FormData();
        formData.append('id', cagedata._id || '');
        formData.append('kennelname', cagedata.kennelname || '');
        formData.append('location', cagedata.location || '');
        formData.append('description', cagedata.description || '');
        formData.append('phone', cagedata.phone || '');
        formData.append('type', cagedata.type || '');
        formData.append('maxCount', cagedata.maxcount?.toString() || '');
        formData.append('PricePerNight', cagedata.pricepernight?.toString() || '');
        formData.append('ownerId', kennelOwnerData?._id || '');


        if (cagedata?.image) {
          for (const img of cagedata.image) {
            const file = await urlToFile(img);
            formData.append('editimages', file);
          }
        }


        const response = await editCages(formData);
        setLoading(false);
        fetchData()
        fetchCages();
        if (response) {
          toast.success('Cage data updated successfully');
          onOpenChange();
        }

      } catch (error) {
        console.error('Error updating cage data:', error);
      }

    }
  }



  const handleImageDelete = (image: string) => {
    setCageData((prev) => ({
      ...prev,
      image: prev?.image?.filter((img) => img !== image),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileArray: File[] = Array.from(e.target.files);
      const urlArray: string[] = fileArray.map((file) => URL.createObjectURL(file));

      setCageData((prev) => {
        const existingImages = prev?.image || [];
        const totalImages = existingImages.length + urlArray.length;

        if (totalImages > 3) {
          const imagesToAdd = 3 - existingImages.length;
          return {
            ...prev,
            image: [...existingImages, ...urlArray.slice(0, imagesToAdd)],
          };
        }

        return {
          ...prev,
          image: [...existingImages, ...urlArray],
        };
      });
    }
  };



  return (
    <>
      <Button className='bg-customPurple text-small font-semibold text-white' onPress={onOpen}>More Details</Button>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <PacmanLoader size={40} color="#ffffff" />
        </div>
      )}
      {!loading && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
          <ModalContent >
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1  ">Cage Details</ModalHeader>
                <ModalBody>
                  <Input
                    type="text"
                    placeholder="Kennel Name"
                    name="kennelname"
                    value={cagedata?.kennelname}
                    onChange={handleChange}
                    className='font-semibold text-gray-500'
                  />
                  {errors.kennelname && <p className="text-red-600">{errors.kennelname}</p>}

                  <Input
                    type="text"
                    placeholder="Location"
                    name="location"
                    value={cagedata?.location}
                    onChange={handleChange}
                    className='font-semibold text-gray-500'
                  />
                  {errors.location && <p className="text-red-600">{errors.location}</p>}

                  <Input
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={cagedata?.description}
                    onChange={handleChange}
                    className='font-semibold text-gray-500'

                  />
                  {errors.description && <p className="text-red-600">{errors.description}</p>}

                  <Input
                    type="text"
                    placeholder="Maxcount"
                    name="maxcount"
                    value={cagedata?.maxcount}
                    onChange={handleChange}
                    className='font-semibold text-gray-500'

                  />
                  {errors.maxCount && <p className="text-red-600">{errors.maxCount}</p>}

                  <Input
                    type="text"
                    placeholder="Type"
                    name="type"
                    value={cagedata?.type}
                    onChange={handleChange}
                    className='font-semibold text-gray-500'

                  />
                  {errors.type && <p className="text-red-600">{errors.type}</p>}

                  <Input
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    value={cagedata?.phone}
                    onChange={handleChange}
                    className='font-semibold text-gray-500'

                  />
                  {errors.phone && <p className="text-red-600">{errors.phone}</p>}

                  <Input
                    type="text"
                    placeholder="pricepernight"
                    name="pricepernight"
                    value={cagedata?.pricepernight}
                    onChange={handleChange}
                    className='font-semibold text-gray-500'

                  />
                  <div className="mb-4 flex flex-wrap">
                    {cagedata?.image?.map((img, index) => (
                      <div key={index} className='relative m-2'>
                        <img src={img} alt={`Cage Image ${index + 1}`} className="w-20 h-20 object-cover rounded" />
                        <button
                          type="button"
                          className="mt-1 p-1 bg-red-500 text-white rounded-full"
                          onClick={() => handleImageDelete(img)}
                        >
                          <MdOutlineDelete />
                        </button>
                      </div>
                    ))}
                  </div>
                  {cagedata?.image && cagedata.image.length < 3 && (
                    <Input
                      type='file'
                      accept='image/*'
                      multiple
                      onChange={handleFileChange} />
                  )}
                  {errors.images && <p className="text-red-600">{errors.images}</p>}

                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button className='text-sm bg-customPurple text-white font-semibold' onPress={() => { handleEdit() }}>
                    Save Changes
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  )
}

export default CageDataModal
