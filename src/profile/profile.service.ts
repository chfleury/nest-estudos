import { Injectable } from '@nestjs/common';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileInput } from './dto/create-profile-input';
import { Profile } from './profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async findProfileById(id: number): Promise<Profile> {
    const profile = await this.profileRepository.findOne(id);

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  async findAllProfiles(): Promise<Profile[]> {
    const profiles = await this.profileRepository.find();

    return profiles;
  }

  async createProfile(data: CreateProfileInput): Promise<Profile> {
    const profile = this.profileRepository.create(data);
    const savedProfile = await this.profileRepository.save(profile);

    if (!savedProfile) {
      throw new InternalServerErrorException('Failed to create profile');
    }

    return savedProfile;
  }

  async deleteProfile(id: number): Promise<boolean> {
    const profile = await this.profileRepository.findOne(id);

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    const deletedUser = this.profileRepository.delete(profile);

    if (deletedUser) {
      return true;
    }

    return false;
  }
}
