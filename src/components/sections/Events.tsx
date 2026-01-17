"use client";

import { MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

interface Event {
  title: string;
  date: Date;
  location: string;
  address: string;
  description: string;
  rsvpLink: string;
}

export function Events() {
  // Placeholder events - in production, these would come from a CMS or API
  const events: Event[] = [
    {
      title: "Town Hall: Housing & Affordability",
      date: new Date(2024, 2, 15, 18, 30), // March 15, 2024, 6:30 PM
      location: "Community Center",
      address: "123 Main St, Springfield",
      description:
        "Join us for a discussion about housing affordability and our plan to keep families in their homes.",
      rsvpLink: "#",
    },
    {
      title: "Canvassing Kickoff",
      date: new Date(2024, 2, 22, 10, 0), // March 22, 2024, 10:00 AM
      location: "Campaign Office",
      address: "456 Oak Avenue, Springfield",
      description:
        "Help us reach voters door-to-door. Training provided, all experience levels welcome.",
      rsvpLink: "#",
    },
    {
      title: "Community BBQ & Meet & Greet",
      date: new Date(2024, 3, 5, 12, 0), // April 5, 2024, 12:00 PM
      location: "Riverside Park",
      address: "789 Park Road, Springfield",
      description:
        "Come meet the candidate, enjoy food, and connect with neighbors. Family-friendly event.",
      rsvpLink: "#",
    },
  ];

  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Format time for display
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  // Get month abbreviation for badge
  const getMonthAbbr = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", { month: "short" }).format(date);
  };

  // Get day number for badge
  const getDay = (date: Date) => {
    return date.getDate();
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "#",
      ariaLabel: "Follow us on Facebook",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "#",
      ariaLabel: "Follow us on Instagram",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "#",
      ariaLabel: "Follow us on Twitter",
    },
    {
      name: "YouTube",
      icon: Youtube,
      href: "#",
      ariaLabel: "Follow us on YouTube",
    },
  ];

  return (
    <SectionWrapper id="events" background="cream">
      {/* Section header */}
      <div className="mb-12 text-center">
        <h2 className="font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
          Upcoming Events
        </h2>
        <p className="mt-4 text-lg text-gray-600 sm:text-xl">
          Join us in the community
        </p>
      </div>

      {/* Events grid */}
      {events.length > 0 ? (
        <>
          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {events.map((event, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-lg bg-white p-6 shadow-md"
              >
                {/* Date badge */}
                <div className="absolute right-4 top-4 flex flex-col items-center rounded-lg bg-accent-500 px-3 py-2 text-center text-white">
                  <span className="text-xs font-semibold uppercase">
                    {getMonthAbbr(event.date)}
                  </span>
                  <span className="text-2xl font-bold">{getDay(event.date)}</span>
                </div>

                {/* Event content */}
                <div className="pr-20">
                  <h3 className="mb-3 font-heading text-xl font-bold text-gray-900">
                    {event.title}
                  </h3>

                  {/* Location */}
                  <div className="mb-2 flex items-start gap-2 text-sm text-gray-600">
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{event.location}</p>
                      <p className="text-xs">{event.address}</p>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{formatTime(event.date)}</span>
                  </div>

                  {/* Description */}
                  <p className="mb-4 text-sm leading-relaxed text-gray-700">
                    {event.description}
                  </p>

                  {/* RSVP button */}
                  <Button
                    href={event.rsvpLink}
                    variant="primary"
                    size="sm"
                    className="w-full"
                  >
                    RSVP
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Social media note */}
          <div className="mt-12 text-center">
            <p className="mb-4 text-gray-600">
              Follow us on social media for event updates
            </p>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className="rounded-full p-2 text-primary-600 transition-colors hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        /* Empty state */
        <div className="text-center">
          <p className="text-lg text-gray-600">
            More events coming soon! Sign up to be notified.
          </p>
        </div>
      )}
    </SectionWrapper>
  );
}
