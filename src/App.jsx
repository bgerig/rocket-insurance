import React, { Component } from "react";
import RatingInformation from "./components/RatingInformation";
import QuoteOverview from "./components/QuoteOverview";
import LoadingOverlay from "./components/LoadingOverlay/LoadingOverlay";
import "./App.css";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.screens = {
            RATING_INFORMATION: "rating_information",
            QUOTE_OVERVIEW: "quote_overview",
        };

        this.state = {
            currentScreen: this.screens.RATING_INFORMATION,
            isWaiting: false,
            error: false,
            quote: null,
            customerInfo: {
                first_name: "",
                last_name: "",
                address: {
                    line_1: "",
                    line_2: "",
                    city: "",
                    region: "",
                    postal: "",
                },
            },
            invalidFields: {
                first_name: false,
                last_name: false,
                address: {
                    line_1: false,
                    line_2: false,
                    city: false,
                    region: false,
                    postal: false,
                },
            },
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleVariableSelectionChange = this.handleVariableSelectionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState((prevState) => {
            // check if field is part of the address
            if (name in prevState.customerInfo.address) {
                return {
                    customerInfo: {
                        ...prevState.customerInfo,
                        address: {
                            ...prevState.customerInfo.address,
                            [name]: value,
                        },
                    },
                    invalidFields: {
                        ...prevState.invalidFields,
                        address: {
                            [name]: false,
                        },
                    },
                };
            }

            return {
                customerInfo: {
                    ...prevState.customerInfo,
                    [name]: value,
                },
                invalidFields: {
                    ...prevState.invalidFields,
                    [name]: false,
                },
            };
        });
    }

    handleVariableSelectionChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        // Only make the API call if no other calls are in progress
        if (!this.state.isWaiting) {
            this.setState((prevState) => ({
                isWaiting: true,
                quote: {
                    ...prevState.quote,
                    variable_selections: {
                        ...prevState.quote.variable_selections,
                        [name]: parseInt(value),
                    },
                },
            }), () => {
                const { quote } = this.state;
                const requestOptions = {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        quote: {
                            quoteId: quote.quoteId,
                            rating_address: quote.rating_address,
                            policy_holder: quote.policy_holder,
                            variable_selections: quote.variable_selections,
                        }
                    }),
                };

                fetch(`https://fed-challenge-api.sure.now.sh/api/v1/quotes/${quote.quoteId}`, requestOptions)
                    .then((res) => res.json())
                    .then(
                        (result) => {
                            console.log({result});
                            this.setState({
                                isWaiting: false,
                                quote: result.quote,
                            });
                        },
                        (error) => {
                            this.setState({
                                isWaiting: false,
                                error: "Something went wrong. Please try again.",
                            });
                        }
                    );
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            return;
        }

        // Only make the API call if no other calls are in progress
        if (!this.state.isWaiting) {
            this.setState({ isWaiting: true }, () => {
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(this.state.customerInfo),
                };

                fetch("https://fed-challenge-api.sure.now.sh/api/v1/quotes", requestOptions)
                    .then((res) => res.json())
                    .then(
                        (result) => {
                            this.setState({
                                isWaiting: false,
                                quote: result.quote,
                                currentScreen: this.screens.QUOTE_OVERVIEW,
                            });
                        },
                        (error) => {
                            this.setState({
                                isWaiting: false,
                                error: "Something went wrong. Please try again.",
                            });
                        }
                    );

                // setTimeout(() => {
                //     this.setState({
                //         isWaiting: false,
                //         // error: "Something went wrong",
                //         quote: {
                //             quoteId: "UP5413263",
                //             rating_address: {
                //                 line_1: "123 Mulberry Lane",
                //                 line_2: "3B",
                //                 city: "Brooklyn",
                //                 region: "NY",
                //                 postal: "11211",
                //             },
                //             policy_holder: {
                //                 first_name: "Prairie",
                //                 last_name: "Johnson",
                //             },
                //             variable_options: {
                //                 deductible: {
                //                     title: "Deductible",
                //                     description:
                //                         "The amount of money you will pay in an insurance claim before the insurance coverage kicks in.",
                //                     values: [500, 1000, 2000],
                //                 },
                //                 asteroid_collision: {
                //                     title: "Asteroid Collision Limit",
                //                     description:
                //                         "The maximum amount covered for damages caused by asteroid collisions.",
                //                     values: [100000, 300000, 500000, 1000000],
                //                 },
                //             },
                //             variable_selections: {
                //                 deductible: 500,
                //                 asteroid_collision: 100000,
                //             },
                //             premium: 6000,
                //         },
                //         currentScreen: this.screens.QUOTE_OVERVIEW,
                //     });
                // }, 1000);
            });
        }
    }

    validateForm() {
        let isFormValid = true;
        const { invalidFields, customerInfo } = this.state;

        if (!customerInfo.first_name.trim()) {
            isFormValid = false;
            invalidFields.first_name = true;
        }
        if (!customerInfo.last_name.trim()) {
            isFormValid = false;
            invalidFields.last_name = true;
        }
        if (!customerInfo.address.line_1.trim()) {
            isFormValid = false;
            invalidFields.address.line_1 = true;
        }
        if (!customerInfo.address.city.trim()) {
            isFormValid = false;
            invalidFields.address.city = true;
        }
        if (!customerInfo.address.region.trim()) {
            isFormValid = false;
            invalidFields.address.region = true;
        }
        if (!customerInfo.address.postal.trim()) {
            isFormValid = false;
            invalidFields.address.postal = true;
        }

        if (!isFormValid) this.setState({ invalidFields });

        return isFormValid;
    }

    render() {
        const { currentScreen, customerInfo, quote, invalidFields, isWaiting, error } = this.state;

        return (
            <div className="rocket-insurance">
                <div className="container pt-6 pb-12">
                    <a href="/" className="block font-bold text-xl lg:text-2xl mb-2">
                        <span className="mr-3">🚀</span>Rocket Insurance
                    </a>
                    <p className="mb-8">Comprehensive coverage options for the modern rocket owner!</p>

                    {currentScreen === this.screens.RATING_INFORMATION && (
                        <RatingInformation
                            customerInfo={customerInfo}
                            onChange={this.handleInputChange}
                            onSubmit={this.handleSubmit}
                            invalidFields={invalidFields}
                        />
                    )}

                    {currentScreen === this.screens.QUOTE_OVERVIEW && quote && (
                        <QuoteOverview
                            quote={quote}
                            onChange={this.handleVariableSelectionChange}
                            onGoBack={() => this.setState({ currentScreen: this.screens.RATING_INFORMATION })}
                        />
                    )}

                    {error && <p className="mt-5 font-bold text-red-600">{error}</p>}
                    {isWaiting && <LoadingOverlay />}
                </div>
            </div>
        );
    }
}
