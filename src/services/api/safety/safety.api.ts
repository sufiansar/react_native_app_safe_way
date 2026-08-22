import { request } from '../client';

export const safetyApi = {
  // Place Search & Details
  searchPlaces: (query: string) =>
    request(`/places/search?query=${encodeURIComponent(query)}`),

  getPlaceDetails: (placeId: string) =>
    request(`/places/${placeId}/details`),

  // Favorite Places
  addFavoritePlace: (data: { name: string; address: string; placeId: string }) =>
    request('/favorite-places', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getFavoritePlaces: () => request('/favorite-places'),

  removeFavoritePlace: (id: string) =>
    request(`/favorite-places/${id}`, {
      method: 'DELETE',
    }),

  // Emergency Contacts
  addEmergencyContact: (data: { name: string; phone: string; relationship: string }) =>
    request('/safety/contacts', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateEmergencyContact: (id: string, data: Partial<{ name: string; phone: string; relationship: string }>) =>
    request(`/safety/contacts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  deleteEmergencyContact: (id: string) =>
    request(`/safety/contacts/${id}`, {
      method: 'DELETE',
    }),

  getEmergencyContacts: () => request('/safety/contacts'),

  // Location Safety Status
  getSafetyStatus: (lat: number, lng: number, radius = 5) =>
    request(`/safety/status?lat=${lat}&lng=${lng}&radius=${radius}`),

  // Location Reviews
  submitLocationReview: (data: { placeId: string; rating: number; comment: string; isSafe: boolean }) =>
    request('/safety/reviews', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getAllLocationReviews: () => request('/safety/reviews'),

  getReviewsByPlace: (placeId: string) =>
    request(`/safety/reviews/place/${placeId}`),

  // Safe Routes & Suggestions
  createSafeRoute: (data: { origin: any; destination: any }) =>
    request('/safety/routes', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getRouteSuggestions: (data: { origin: any; destination: any }) =>
    request('/safety/route-suggestion', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateRouteStatus: (routeId: string, status: string) =>
    request(`/safety/routes/${routeId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  // Live Location Share
  createLiveLocationShare: (data: { durationMinutes: number; contacts: string[] }) =>
    request('/safety/share', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getSharedLocation: (shareId: string) =>
    request(`/safety/share/${shareId}`),

  // Emergency SOS Alert
  triggerSOS: (data: { latitude: number; longitude: number; note?: string }) =>
    request('/safety/sos', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getSosStatus: () => request('/safety/sos/status'),

  resolveSOS: (sosId: string) =>
    request(`/safety/sos/${sosId}/resolve`, {
      method: 'PATCH',
    }),
};
