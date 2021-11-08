import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateProfileInput } from './dto/create-profile-input';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';

@Resolver()
export class ProfileResolver {
  constructor(private profileService: ProfileService) {}

  @Mutation(() => Profile)
  async createProfile(
    @Args('data') data: CreateProfileInput,
  ): Promise<Profile> {
    const user = await this.profileService.createProfile(data);

    return user;
  }
}
