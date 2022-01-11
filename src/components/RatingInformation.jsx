import Input from "./Input";

const RatingInformation = (props) => {
    const { customerInfo, invalidFields, onChange, onSubmit } = props;

    return (
        <div className="rating-information">
            <h2 className="font-bold text-3xl mb-4">Rating Information</h2>
            <hr className="mb-6" />

            <p className="mb-6">Enter your rating information to get a quote:</p>

            <form className="rating-information-form max-w-full sm:w-2/3 md:w-1/2" onSubmit={onSubmit}>
                <div className="sm:flex">
                    <Input
                        required
                        className="sm:mr-4 mb-4 flex-1"
                        id="first_name"
                        name="first_name"
                        label="First Name"
                        value={customerInfo.first_name}
                        onChange={onChange}
                        invalid={invalidFields.first_name}
                    />
                    <Input
                        required
                        className="mb-4 flex-1"
                        id="last_name"
                        name="last_name"
                        label="Last Name"
                        value={customerInfo.last_name}
                        onChange={onChange}
                        invalid={invalidFields.last_name}
                    />
                </div>
                <Input
                    required
                    className="mb-4 w-full"
                    id="line_1"
                    name="line_1"
                    label="Address Line 1"
                    value={customerInfo.address.line_1}
                    onChange={onChange}
                    invalid={invalidFields.address.line_1}
                />
                <Input
                    required
                    className="mb-4"
                    id="line_2"
                    name="line_2"
                    label="Address Line 2"
                    value={customerInfo.address.line_2}
                    onChange={onChange}
                />
                <Input
                    required
                    className="mb-4"
                    id="city"
                    name="city"
                    label="City"
                    value={customerInfo.address.city}
                    onChange={onChange}
                    invalid={invalidFields.address.city}
                />
                <div className="sm:flex">
                    <Input
                        required
                        className="sm:mr-4 mb-4 flex-1"
                        id="region"
                        name="region"
                        label="State"
                        value={customerInfo.address.region}
                        onChange={onChange}
                        invalid={invalidFields.address.region}
                    />
                    <Input
                        required
                        className="flex-1"
                        id="postal"
                        name="postal"
                        label="Zip Code"
                        value={customerInfo.postal}
                        onChange={onChange}
                        invalid={invalidFields.address.postal}
                    />
                </div>

                <button
                    type="submit"
                    className="mt-6 py-2 px-5 bg-violet-500 text-white font-semibold rounded-full shadow-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-opacity-75"
                >
                    Get Quote
                </button>
            </form>
        </div>
    );
};

export default RatingInformation;
