import { request } from '../client';

export const policeApi = {
  // Add Police Contact
  addPoliceContact: (data: { name: string; phone: string; stationName: string }) =>
    request('/police-contacts', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Auto Add Nearby Police Stations
  autoAddNearbyPolice: (data: { latitude: number; longitude: number; radius = 10 }) =>
    request('/police-contacts/auto-add-nearby', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Get My Police Contacts
  getMyPoliceContacts: () => request('/police-contacts'),

  // Update Police Contact
  updatePoliceContact: (contactId: string, data: Partial<{ name: string; phone: string; stationName: string }>) =>
    request(`/police-contacts/${contactId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  // Delete Police Contact
  deletePoliceContact: (contactId: string) =>
    request(`/police-contacts/${contactId}`, {
      method: 'DELETE',
    }),
};
