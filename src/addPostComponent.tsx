import { useState } from 'react';

const AddPostComponent = () => {
    const [fileName, setFileName] = useState('Upload photo');

    const handleImageChange = (event : any) => {
        if (event.target.files.length > 0) {
            setFileName(`Selected: ${event.target.files[0].name}`);
        } else {
            setFileName('Upload photo');
        }
    };

    return (
        <section className="w-full max-w-sm mx-auto shadow-md rounded-md">
            {/* Title */}
            <header className="mb-4 border-b-2 border-gray-400 p-4">
                <h2 className="font-bold text-lg">Add a Post</h2>
                <h3 className="text-gray-500 mt-2 mb-6">Add a post to our community here!</h3>
            </header>

            {/* Name Input */}
            <div className="p-4 flex items-start mb-4 flex-col">
                <label htmlFor="add_name" className="text-mdm flex-grow font-bold text-gray-600">
                    Your name*
                </label>
                <input
                    id="add_name"
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                />
            </div>

            {/* Image Upload */}
            <div className="p-4 mb-4">
                <label
                    htmlFor="add_image"
                    id="uploadLabel"
                    className="block flex items-center justify-center text-md mb-1 w-48 h-12 border-2 border-gray-200 m-auto rounded-xl cursor-pointer"
                >
                    {fileName}
                </label>
                <input
                    type="file"
                    accept="image/*"
                    id="add_image"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hidden"
                    onChange={handleImageChange}
                />
            </div>

            {/* Story Input */}
            <div className="p-4 mb-4 flex items-start flex-col">
                <label htmlFor="add_story" className="block text-md text-center font-bold text-gray-600">
                    Share your story*
                </label>
                <textarea
                    id="add_story"
                    className="w-full p-2 border border-gray-300 rounded-md h-24 text-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write a few sentences about yourself"
                />
            </div>

            {/* Submit Button */}
            <div className="p-4 text-center">
                <button
                    id="add_post"
                    className="w-full text-xl font-bold py-2 px-6 rounded-md transition duration-200 ease-in-out"
                >
                    Post
                </button>
            </div>
        </section>
    );
};

export default AddPostComponent;
