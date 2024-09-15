import { ConvexLogo } from "@/GetStarted/ConvexLogo";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

export function GetStartedDialog({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[calc(100vh-8rem)] grid-rows-[1fr_auto]">
        <DialogHeader>
          <DialogTitle className="flex items-baseline gap-2">
            RUNK powered by <ConvexLogo width={69} height={11} />
          </DialogTitle>
        </DialogHeader>
        <GetStartedContent />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Got it</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function GetStartedContent() {
  const [formData, setFormData] = useState({
    ageGroup: "",
    occupation: "",
    maritalStatus: "",
    personalityType: "",
    learningStyles: "",
    race: "",
    ethnicity: "",
  });
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("userFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const jsonData = JSON.stringify(formData, null, 2);
  
    // Save the JSON data to localStorage
    localStorage.setItem("userFormData", jsonData);
  
    // Save each form field in a separate cookie
    Object.entries(formData).forEach(([key, value]) => {
      document.cookie = `${key}=${encodeURIComponent(value)}; path=/; max-age=31536000;`;
    });
  
    // You can remove the file download part if you don't need it
    // const blob = new Blob([jsonData], { type: "text/plain" });
    // const url = URL.createObjectURL(blob);
    // const link = document.createElement("a");
    // link.href = url;
    // link.download = "user_profile.txt";
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    // URL.revokeObjectURL(url);
  
    console.log("Form data saved in localStorage and cookies:", jsonData);
  };
  
  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  if (showProfile) {
    return (
      <div className="overflow-y-auto p-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full max-w-md">
          {Object.entries(formData).map(([key, value]) => (
            <p key={key} className="mb-2">
              <span className="font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}:</span> {value || "Not specified"}
            </p>
          ))}
        </div>
        <Button onClick={toggleProfile} className="mt-4">
          Edit Profile
        </Button>
      </div>
    );
  }
  return (
    <div className="overflow-y-auto p-6 flex justify-center">
      <div className="w-full max-w-2xl">
        <p className="text-muted-foreground mb-4 text-lg font-semibold text-center">
          Complete your profile to discover products tailored to you.
        </p>
        <div className="grid gap-6">
          <form
            className="space-y-6 bg-white p-8 rounded-lg shadow-md border border-gray-200 w-full"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="ageGroup" className="block text-sm font-medium text-gray-700 mb-2">
                Age Group
              </label>
              <select
                id="ageGroup"
                value={formData.ageGroup}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm text-gray-700"
              >
                <option value="">Select Age Group</option>
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45+">45+</option>
              </select>
            </div>

            <div>
              <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-2">
                Occupation
              </label>
              <select
                id="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm text-gray-700"
              >
                <option value="">Select Occupation</option>
                <option value="Manager">Student</option>
                <option value="Executive">Executive</option>
                <option value="Entrepreneur">Entrepreneur</option>
                <option value="Financial Analyst">Financial Analyst</option>
                <option value="Artist">Artist</option>
                <option value="Graphic Designer">Graphic Designer</option>
                <option value="Musician">Musician</option>
                <option value="Writer">Writer</option>
                <option value="Engineer">Engineer</option>
                <option value="Software Developer">Software Developer</option>
                <option value="Scientist">Scientist</option>
                <option value="Mathematician">Mathematician</option>
                <option value="Doctor">Doctor</option>
                <option value="Nurse">Nurse</option>
                <option value="Therapist">Therapist</option>
                <option value="Healthcare Administrator">Healthcare Administrator</option>
                <option value="Teacher">Teacher</option>
                <option value="Professor">Professor</option>
                <option value="Trainer">Trainer</option>
                <option value="Education Administrator">Education Administrator</option>
              </select>
            </div>

            <div>
              <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700 mb-2">
                Marital Status
              </label>
              <select
                id="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm text-gray-700"
              >
                <option value="">Select Marital Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Separated">Separated</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>

            <div>
              <label htmlFor="personalityType" className="block text-sm font-medium text-gray-700 mb-2">
                Personality Type
              </label>
              <select
                id="personalityType"
                value={formData.personalityType}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm text-gray-700"
              >
                <option value="">Select Personality Type</option>
                <option value="ISTJ">ISTJ (Introverted, Sensing, Thinking, Judging)</option>
                <option value="ISFJ">ISFJ (Introverted, Sensing, Feeling, Judging)</option>
                <option value="INFJ">INFJ (Introverted, Intuitive, Feeling, Judging)</option>
                <option value="INTJ">INTJ (Introverted, Intuitive, Thinking, Judging)</option>
                <option value="ISTP">ISTP (Introverted, Sensing, Thinking, Perceiving)</option>
                <option value="ISFP">ISFP (Introverted, Sensing, Feeling, Perceiving)</option>
                <option value="INFP">INFP (Introverted, Intuitive, Feeling, Perceiving)</option>
                <option value="INTP">INTP (Introverted, Intuitive, Thinking, Perceiving)</option>
                <option value="ESTP">ESTP (Extraverted, Sensing, Thinking, Perceiving)</option>
                <option value="ESFP">ESFP (Extraverted, Sensing, Feeling, Perceiving)</option>
                <option value="ENFP">ENFP (Extraverted, Intuitive, Feeling, Perceiving)</option>
                <option value="ENTP">ENTP (Extraverted, Intuitive, Thinking, Perceiving)</option>
                <option value="ESTJ">ESTJ (Extraverted, Sensing, Thinking, Judging)</option>
                <option value="ESFJ">ESFJ (Extraverted, Sensing, Feeling, Judging)</option>
                <option value="ENFJ">ENFJ (Extraverted, Intuitive, Feeling, Judging)</option>
                <option value="ENTJ">ENTJ (Extraverted, Intuitive, Thinking, Judging)</option>
              </select>
            </div>

            <div>
              <label htmlFor="learningStyles" className="block text-sm font-medium text-gray-700 mb-2">
                Learning Styles
              </label>
              <select
                id="learningStyles"
                value={formData.learningStyles}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm text-gray-700"
              >
                <option value="">Select Learning Style</option>
                <option value="Visual">Visual</option>
                <option value="Auditory">Auditory</option>
                <option value="Kinesthetic">Kinesthetic</option>
                <option value="Tactile">Tactile</option>
              </select>
            </div>

            <div>
              <label htmlFor="race" className="block text-sm font-medium text-gray-700 mb-2">
                Race
              </label>
              <select
                id="race"
                value={formData.race}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm text-gray-700"
              >
                <option value="">Select Race</option>
                <option value="White">White</option>
                <option value="Black or African American">Black or African American</option>
                <option value="Asian">Asian</option>
                <option value="American Indian or Alaska Native">American Indian or Alaska Native</option>
                <option value="Native Hawaiian or Other Pacific Islander">Native Hawaiian or Other Pacific Islander</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            <div>
              <label htmlFor="ethnicity" className="block text-sm font-medium text-gray-700 mb-2">
                Ethnicity
              </label>
              <select
                id="ethnicity"
                value={formData.ethnicity}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm text-gray-700"
              >
                <option value="">Select Ethnicity</option>
                <option value="Hispanic or Latino">Hispanic or Latino</option>
                <option value="Non-Hispanic or Latino">Non-Hispanic or Latino</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="submit" className="w-1/2 mt-4">
                Submit
              </Button>
              <Button type="button" onClick={toggleProfile} className="w-1/2 mt-4" variant="outline">
                View Profile
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GetStartedContent;