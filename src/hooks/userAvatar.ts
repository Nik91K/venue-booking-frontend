import { createAvatar } from '@dicebear/core';
import { thumbs } from '@dicebear/collection';

export function userAvatar(username: string) {
  const avatar = createAvatar(thumbs, {
    seed: username,
  }).toDataUri();

  return avatar;
}
