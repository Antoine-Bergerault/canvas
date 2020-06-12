const Canvas = require('../canvas');

const RGB = Canvas.__get__('RGB');

let Color = new RGB(100, 120, 200);

test('Get the red value', () => {
    expect(Color.r).toBe(100);
});

test('Get the green value', () => {
    expect(Color.g).toBe(120);
});

test('Get the blue value', () => {
    expect(Color.b).toBe(200);
});

describe('Set red value', () => {
    let spy = spyConsole();

    it('should be the same', () => {
        Color.r = 220;
        expect(Color.r).toBe(220);
    });

    it('should be set to 0', () => {
        Color.r = -10;
        expect(console.error).toHaveBeenCalled();
        expect(spy.console.mock.calls[0][0]).toContain('Color interval [0 - 255] no repespected (-10 given)');
        expect(Color.r).toBe(0);
    });

    it('should be set to 255', () => {
        Color.r = 300;
        expect(console.error).toHaveBeenCalled();
        expect(spy.console.mock.calls[1][0]).toContain('Color interval [0 - 255] no repespected (300 given)');
        expect(Color.r).toBe(255);
    });
});

test('Get hexadecimal from RGB', () => {
    let rgb = new RGB(255, 255, 255);
    expect(rgb.toHEX().color.str).toBe('#ffffff');
    rgb.set(0, 0, 0);
    expect(rgb.toHEX().color.str).toBe('#000000');
});

test('Test RGB to string', () => {
    let rgb = new RGB(255, 255, 255);
    expect(rgb.toString()).toBe('rgb(255, 255, 255)');
    rgb.set(0, 0, 0);
    expect(rgb.toString()).toBe('rgb(0, 0, 0)');
    rgb.set(1, 10, 20);
    expect(rgb.toString()).toBe('rgb(1, 10, 20)');
});




function spyConsole() {
    // https://github.com/facebook/react/issues/7047
    let spy = {};

    beforeAll(() => {
        spy.console = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
        spy.console.mockRestore();
    });

    return spy;
}