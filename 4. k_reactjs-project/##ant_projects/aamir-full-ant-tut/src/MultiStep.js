import React, { useState } from 'react';
import { Steps, Form, Input, Button, Checkbox } from 'antd';

const { Step } = Steps;
const { Item } = Form;

const MultiStepForm = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleFinish = () => {
        console.log('Form submitted successfully!');
    };

    const handleNext = () => {
        if (currentStep === steps.length - 1) {
            if (termsAccepted) {
                handleFinish();
            } else {
                alert('Please accept the terms and conditions to proceed.');
            }
        } else {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleTermsChange = (e) => {
        setTermsAccepted(e.target.checked);
    };

    const steps = [
        {
            title: 'Personal Information',
            content: (
                <Form layout="vertical">
                    <Item label="Name">
                        <Input placeholder="Enter your name" />
                    </Item>
                    <Item label="Email">
                        <Input placeholder="Enter your email" />
                    </Item>
                </Form>
            ),
        },
        {
            title: 'Contact Information',
            content: (
                <Form layout="vertical">
                    <Item label="Phone Number">
                        <Input placeholder="Enter your phone number" />
                    </Item>
                    <Item label="Address">
                        <Input placeholder="Enter your address" />
                    </Item>
                </Form>
            ),
        },
        {
            title: 'Additional Information',
            content: (
                <Form layout="vertical">
                    <Item label="Skills">
                        <Input placeholder="Enter your skills" />
                    </Item>
                    <Item label="Experience">
                        <Input placeholder="Describe your experience" />
                    </Item>
                </Form>
            ),
        },
        {
            title: 'Terms and Conditions',
            content: (
                <div>
                    <p>Please read the following terms and conditions carefully.</p>
                    <p>By clicking the "Finish" button, you agree to all of the terms and conditions.</p>
                    <Checkbox onChange={handleTermsChange} checked={termsAccepted}>I have read and agree to the terms and conditions.</Checkbox>
                </div>
            ),
        },
    ];

    const renderStepContent = (step) => {
        return step.content;
    };

    return (
        <div className="multi-step-form">
            <Steps current={currentStep} progressDot={false}>
                {steps.map((step) => (
                    <Step title={step.title} key={step.title} />
                ))}
            </Steps>
            <div className="step-content">{renderStepContent(steps[currentStep])}</div>
            <div className="step-actions">
                {currentStep > 0 && (
                    <Button onClick={handlePrevious} style={{ marginRight: 8 }}>
                        Previous
                    </Button>
                )}
                <Button onClick={handleNext} type={currentStep === steps.length - 1 ? 'primary' : 'default'}>
                    {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </div>
        </div>
    );
};

export default MultiStepForm;
