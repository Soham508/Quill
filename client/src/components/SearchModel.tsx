import { TextInput, Modal, Label, Button, ToggleSwitch, Toast } from "flowbite-react";
import { useState } from "react";
import { HiExclamation, HiOutlineSearch } from "react-icons/hi";


const SearchModel = () => {
    const [openModal, setOpenModal] = useState(false);
    const [article, setArticle] = useState(true);
    const [user, setUser] = useState(false);

    return (
        <div className="flex items-center w-full justify-center">
            <TextInput className="" icon={HiOutlineSearch} onClick={() => { setOpenModal(true) }} placeholder="Search" shadow color='gray' required />

            <Modal show={openModal} className="bg-slate-900 " size="md" popup onClose={() => setOpenModal(false)} >
                <Modal.Header className="bg-slate-100 rounded-xl" />
                <Modal.Body className="bg-slate-100 rounded-xl">
                    <div className="space-y-6">
                        <h1 className="text-2xl font-medium text-gray-900 text-center dark:text-white">Search</h1>

                        <div>
                            <div className="mb-2 justify-center flex">
                                <Label htmlFor="searchBar" value="Search for articles and users" />
                            </div>
                            <TextInput id="searchBar" icon={HiOutlineSearch} placeholder="Search..." required />
                        </div>
                        <div className="flex flex-row justify-center gap-8">
                            <ToggleSwitch checked={article} label="Articles" onChange={setArticle} />
                            <ToggleSwitch checked={user} label="Users" onChange={setUser} />
                        </div>

                        {(!article && !user) ? <div className="flex justify-center w-full">
                            <Toast>
                                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
                                    <HiExclamation className="h-5 w-5" />
                                </div>
                                <div className="ml-3 text-sm font-normal">Please select atleast one field for search</div>
                            </Toast>
                        </div> : ''
                        }

                        <div className="flex justify-center">
                            <Button color="dark" onClick={() => { setOpenModal(false) }}>Back</Button>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>

        </div>
    )
}

export default SearchModel