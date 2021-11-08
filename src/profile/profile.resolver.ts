import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { isAdminGuard } from 'src/roles/isAdmin.guard';
import { CreateProfileInput } from './dto/create-profile-input';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';

@Resolver()
export class ProfileResolver {
  constructor(private profileService: ProfileService) {}

  @UseGuards(GqlAuthGuard)
  @UseGuards(isAdminGuard)
  @Query(() => [Profile])
  async profiles(): Promise<Profile[]> {
    const profiles = await this.profileService.findAllProfiles();
    return profiles;
  }

  @UseGuards(GqlAuthGuard)
  @UseGuards(isAdminGuard)
  @Query(() => Profile)
  async profile(@Args('id') id: number): Promise<Profile> {
    const profile = await this.profileService.findProfileById(id);

    return profile;
  }

  @UseGuards(GqlAuthGuard)
  @UseGuards(isAdminGuard)
  @Mutation(() => Profile)
  async createProfile(
    @Args('data') data: CreateProfileInput,
  ): Promise<Profile> {
    const profile = await this.profileService.createProfile(data);

    return profile;
  }

  @UseGuards(GqlAuthGuard)
  @UseGuards(isAdminGuard)
  @Mutation(() => Boolean)
  async deleteProfile(@Args('id') id: number): Promise<boolean> {
    const bool = await this.profileService.deleteProfile(id);

    return bool;
  }
}
