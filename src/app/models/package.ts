export class Package {
    constructor(
        public id: string,
        public weeklyDownloads: number,
        public dependencyCount: number,
        public dependencies: string[] | null
    ) {}
}