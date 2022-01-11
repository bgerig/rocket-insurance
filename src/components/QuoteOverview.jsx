const QuoteOverview = (props) => {
    const { quote, onChange, onGoBack } = props;

    return (
        <div className="quote-overview">
            <h2 className="font-bold text-3xl mb-4">Quote Overview</h2>
            <hr className="mb-7" />

            <h3 className="font-bold">Policy Holder</h3>
            <p className="text-2xl font-light mb-8">
                {quote.policy_holder.first_name} {quote.policy_holder.last_name}
            </p>

            <form>
                <h3 className="font-bold text-xl mb-1">Available Coverage Options</h3>
                <p className="mb-6">
                    You can update your quote by selecting your preferred option for each coverage available.
                </p>
                <div className="mb-6">
                    <h4 className="font-semibold">{quote.variable_options.deductible.title}</h4>
                    <p className="text-sm mb-2">{quote.variable_options.deductible.description}</p>
                    <select
                        name="deductible"
                        id="deductible"
                        onChange={onChange}
                        value={quote.variable_selections.deductible}
                        className="bg-gray-200 px-3 py-2 rounded w-48 max-w-full"
                    >
                        {quote.variable_options.deductible.values.map((value) => (
                            <option key={value} value={value}>
                                ${value.toLocaleString("en-US")}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-10">
                    <h4 className="font-semibold text-md">{quote.variable_options.asteroid_collision.title}</h4>
                    <p className="text-sm mb-2">{quote.variable_options.asteroid_collision.description}</p>
                    <select
                        name="asteroid_collision"
                        id="asteroid_collision"
                        onChange={onChange}
                        value={quote.variable_selections.asteroid_collision}
                        className="bg-gray-200 px-3 py-2 rounded w-48 max-w-full"
                    >
                        {quote.variable_options.asteroid_collision.values.map((value) => (
                            <option key={value} value={value}>
                                ${value.toLocaleString("en-US")}
                            </option>
                        ))}
                    </select>
                </div>
            </form>

            <h3 className="font-bold">Annual Premium</h3>
            <span className="text-5xl font-light"> ${quote.premium.toLocaleString("en-US")}</span>

            <button
                type="button"
                onClick={onGoBack}
                className="block mt-12 text-violet-500 font-semibold hover:text-violet-700"
            >
                &laquo; Go Back
            </button>
        </div>
    );
};

export default QuoteOverview;
