interface IProgrammingLanguage {
    id: number;
    name: string;
    language: string;
    profileId: number;
  }

  interface IProfile {
    id: string;
    username: string;
    website: string;
    company: string;
    programmingLanguages: string[];
  }

  interface Profile extends IProfile {
    // Profile can extend IProfile if they share common properties
    authoremail: string,
    picture: string,
  }
  