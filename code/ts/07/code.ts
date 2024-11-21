const input = await Bun.file(`${import.meta.dir}/../../../input/7.txt`).text();

export function find<T>(iterable: Iterable<T>, predicate: (value: T) => boolean): T | undefined {
    for (const value of iterable) {
        if (predicate(value)) {
            return value;
        }
    }
}

function produceFileSystem(lines: Line[]) {
    const fs = new FileSystem();
    for (const line of lines) {
        if (line.type === "command" && line.command === "cd") {
            fs.changeDirectory(line.path);
            continue;
        }

        if (line.type === "command" && line.command === "ls") {
            continue;
        }

        if (line.type === "directory") {
            fs.getCurrentDirectory().addDirectory(line.name);
            continue;
        }

        if (line.type === "file") {
            fs.getCurrentDirectory().addFile(line);
            continue;
        }
    }
    return fs;
}

function parseLines(input: string) {
    const [firstLine, ...lines] = input
        .trim()
        .split("\n")
        .map(line => parseLine(line));

    if (
        !firstLine ||
        firstLine.type !== "command" ||
        firstLine.command !== "cd" ||
        firstLine.path !== "/"
    ) {
        throw new Error("Invalid input");
    }

    return lines;
}

type Line =
    | {
          type: "command";
          command: "cd";
          path: string;
      }
    | {
          type: "command";
          command: "ls";
      }
    | {
          type: "directory";
          name: string;
      }
    | {
          type: "file";
          name: string;
          size: number;
      };

function parseLine(input: string): Line {
    if (input.startsWith("$ cd ")) {
        return {
            type: "command",
            command: "cd",
            path: input.slice(5),
        };
    }

    if (input.startsWith("$ ls")) {
        return {
            type: "command",
            command: "ls",
        };
    }

    if (input.startsWith("dir ")) {
        return {
            type: "directory",
            name: input.slice(4),
        };
    }

    const [sizeString, name] = input.split(" ");

    if (name == null) {
        throw new Error(`Invalid input: ${input}`);
    }

    const size = parseInt(sizeString!, 10);

    if (isNaN(size)) {
        throw new Error(`Invalid size: ${sizeString} for file ${name}`);
    }

    return {
        type: "file",
        name,
        size,
    };
}

class FileSystem {
    root: Directory;
    currentDirectory: Directory;

    constructor() {
        this.root = new Directory("/");
        this.currentDirectory = this.root;
    }

    getCurrentDirectory(): Directory {
        return this.currentDirectory;
    }

    getRoot(): Directory {
        return this.root;
    }

    changeDirectory(path: string) {
        if (path === "..") {
            this.changeDirectoryUp();
            return;
        }

        const children = this.currentDirectory.getDirectories();
        const targetDirectory = find(children, child => child.getName() === path);
        if (!targetDirectory) {
            throw new Error(`No such directory: ${path}`);
        }

        this.currentDirectory = targetDirectory;
    }

    changeDirectoryUp() {
        const parent = this.currentDirectory.getParent();
        if (parent === null) {
            return;
        }
        this.currentDirectory = parent;
    }
}

type File = {
    name: string;
    size: number;
};

class Directory {
    name: string;
    parent: Directory | null = null;
    files = new Map<string, File>();
    directories = new Map<string, Directory>();

    constructor(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    getParent(): Directory | null {
        const parent = this.parent;

        if (this.name === "/" && parent === null) {
            return null;
        }

        if (parent === null) {
            throw new Error(`No parent for directory: ${this.name}`);
        }

        return parent;
    }

    getFiles(): IterableIterator<File> {
        return this.files.values();
    }

    getDirectories(): IterableIterator<Directory> {
        return this.directories.values();
    }

    addFile(file: File) {
        if (this.files.has(file.name)) {
            return;
        }

        this.files.set(file.name, file);
    }

    addDirectory(name: string) {
        if (this.directories.has(name)) {
            return;
        }

        const directory = new Directory(name);
        directory.parent = this;

        this.directories.set(directory.getName(), directory);
    }

    *walk(): Generator<Directory, void, undefined> {
        yield this;
        for (const directory of this.getDirectories()) {
            yield* directory.walk();
        }
    }

    getSize(): number {
        const fileTotal = [...this.getFiles()].reduce((total, file) => total + file.size, 0);
        const directoryTotal = [...this.getDirectories()].reduce(
            (total, directory) => total + directory.getSize(),
            0,
        );

        return fileTotal + directoryTotal;
    }
}

const sp1 = (input: string) => {
    const fs = produceFileSystem(parseLines(input));

    let total = 0;
    for (const directory of fs.getRoot().walk()) {
        const size = directory.getSize();

        if (size <= 100000) {
            total += size;
        }
    }

    return total;
};

export const partone = sp1(input);

const sp2 = (input: string) => {
    const fs = produceFileSystem(parseLines(input));
    const root = fs.getRoot();
    const unusedSpace = 70_000_000 - root.getSize();
    const spaceToFree = 30_000_000 - unusedSpace;

    let smallest = Infinity;
    for (const directory of root.walk()) {
        const size = directory.getSize();

        if (size >= spaceToFree && size < smallest) {
            smallest = size;
        }
    }

    return smallest;
};

export const parttwo = sp2(input);
