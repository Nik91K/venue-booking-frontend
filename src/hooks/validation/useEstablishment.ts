const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_PHOTOS = 8;

function textValidation(data: string, minChars: number): boolean {
  return data.trim().length >= minChars;
}

function validatePhoto(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type))
    return `"${file.name}" must be JPG, PNG, or WebP`;
  if (file.size > MAX_FILE_SIZE_BYTES)
    return `"${file.name}" exceeds the ${MAX_FILE_SIZE_MB} MB limit`;
  return null;
}

export function validatePhotos(coverPhoto: File | null, photos: File[]) {
  const newErrors: Record<string, string> = {};

  if (!coverPhoto) {
    newErrors.coverPhoto = 'A cover photo is required';
  } else {
    validatePhoto(coverPhoto);
  }

  if (photos.length > MAX_PHOTOS) {
    newErrors.photos = `You can upload at most ${MAX_PHOTOS} additional photos`;
  }

  for (const file of photos) {
    validatePhoto(file);
  }

  return newErrors;
}

export function establishmentValidation(formData: {
  name: string;
  description: string;
  totalSeats: number;
  coverPhoto: File | null;
  photos: File[];
  type: number;
}) {
  const newErrors: Record<string, string> = {};

  if (!textValidation(formData.name, 2)) {
    newErrors.name = 'Name must be at least 2 characters';
  }

  if (!textValidation(formData.description, 10)) {
    newErrors.description = 'Description must be at least 10 characters';
  }

  if (formData.totalSeats <= 2) {
    newErrors.totalSeats = 'The facility must have more than 2 seats';
  }

  if (!formData.type) {
    newErrors.type = 'Type is required';
  }

  return {
    ...newErrors,
    ...validatePhotos(formData.coverPhoto, formData.photos),
  };
}
