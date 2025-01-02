import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BookingSystem = () => {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState({
    date: "",
    time: "",
    guests: "",
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [timeSlots, setTimeSlots] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // Simulate available time slots based on date
  const generateTimeSlots = (date) => {
    const slots = [];
    for (let hour = 11; hour <= 21; hour++) {
      slots.push(`${hour}:00`);
      slots.push(`${hour}:30`);
    }
    setTimeSlots(slots);
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setBooking({ ...booking, date });
    generateTimeSlots(date);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!booking.date) newErrors.date = "Date is required";
    if (!booking.time) newErrors.time = "Time is required";
    if (!booking.guests) newErrors.guests = "Number of guests is required";
    if (!booking.name) newErrors.name = "Name is required";
    if (!booking.email) newErrors.email = "Email is required";
    if (!booking.phone) newErrors.phone = "Phone is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSubmitted(true);
      } catch (error) {
        console.error("Booking error:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto">
        {!submitted ? (
          <Card>
            <CardHeader>
              <CardTitle>Table Reservation</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={booking.date}
                    onChange={handleDateChange}
                    className={errors.date ? "border-red-500" : ""}
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm">{errors.date}</p>
                  )}
                </div>

                {booking.date && (
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <select
                      id="time"
                      value={booking.time}
                      onChange={(e) =>
                        setBooking({ ...booking, time: e.target.value })
                      }
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                    {errors.time && (
                      <p className="text-red-500 text-sm">{errors.time}</p>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    max="10"
                    value={booking.guests}
                    onChange={(e) =>
                      setBooking({ ...booking, guests: e.target.value })
                    }
                    className={errors.guests ? "border-red-500" : ""}
                  />
                  {errors.guests && (
                    <p className="text-red-500 text-sm">{errors.guests}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={booking.name}
                    onChange={(e) =>
                      setBooking({ ...booking, name: e.target.value })
                    }
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={booking.email}
                    onChange={(e) =>
                      setBooking({ ...booking, email: e.target.value })
                    }
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={booking.phone}
                    onChange={(e) =>
                      setBooking({ ...booking, phone: e.target.value })
                    }
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  Book Table
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Booking Confirmed!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <strong>Date:</strong> {booking.date}
                </p>
                <p>
                  <strong>Time:</strong> {booking.time}
                </p>
                <p>
                  <strong>Guests:</strong> {booking.guests}
                </p>
                <p>
                  <strong>Name:</strong> {booking.name}
                </p>
                <p>
                  <strong>Email:</strong> {booking.email}
                </p>
                <p>
                  <strong>Phone:</strong> {booking.phone}
                </p>
              </div>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setBooking({
                    date: "",
                    time: "",
                    guests: "",
                    name: "",
                    email: "",
                    phone: "",
                  });
                }}
                className="mt-4"
              >
                Make Another Booking
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BookingSystem;
