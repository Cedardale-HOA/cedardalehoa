import {defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Prevent editors from creating more than one settings document
  __experimental_actions: ['update', 'publish'],
  fields: [
    // Dues
    defineField({
      name: 'duesAmount',
      title: 'Annual Dues Amount',
      type: 'string',
      description: 'e.g. "$42"',
    }),
    defineField({
      name: 'duesTagline',
      title: 'Dues Tagline',
      type: 'string',
      description: 'e.g. "less than $4 a month"',
    }),
    defineField({
      name: 'dueDate',
      title: 'Dues Due Date',
      type: 'string',
      description: 'e.g. "March 31, 2026"',
    }),
    defineField({
      name: 'billingPeriod',
      title: 'Billing Period',
      type: 'string',
      description: 'e.g. "Jan 1 – Dec 31"',
    }),
    // Links
    defineField({
      name: 'newsletterUrl',
      title: 'Newsletter Signup URL',
      type: 'url',
    }),
    defineField({
      name: 'facebookGroupUrl',
      title: 'Facebook Group URL',
      type: 'url',
    }),
    defineField({
      name: 'hoaDocumentsUrl',
      title: 'HOA Documents (Google Drive) URL',
      type: 'url',
    }),
    defineField({
      name: 'meetingMinutesUrl',
      title: 'Meeting Minutes (Google Drive) URL',
      type: 'url',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Board Contact Email',
      type: 'string',
    }),
    // About section
    defineField({
      name: 'aboutHeading',
      title: 'About Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'aboutBody',
      title: 'About Section Body',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'aboutImage',
      title: 'About Section Image',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings'}
    },
  },
})
